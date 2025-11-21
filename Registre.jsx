import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from '../hooks/use-toast';
import { loadMockData, saveMockData, mockPlayers } from '../mock';
import { UserCheck } from 'lucide-react';

const Registre = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validações
    if (!formData.firstName || !formData.lastName || !formData.phone) {
      toast({
        title: 'Erro',
        description: 'Por favor, preencha todos os campos.',
        variant: 'destructive'
      });
      return;
    }

    const phoneNumbers = formData.phone.replace(/\D/g, '');
    if (phoneNumbers.length !== 11) {
      toast({
        title: 'Erro',
        description: 'Telefone deve ter DDD + 9 dígitos (ex: 11 99999-9999).',
        variant: 'destructive'
      });
      return;
    }

    // Carregar jogadores existentes
    const players = loadMockData('players', mockPlayers);

    // Verificar duplicatas
    const duplicateName = players.find(
      (p) => p.firstName.toLowerCase() === formData.firstName.toLowerCase() &&
             p.lastName.toLowerCase() === formData.lastName.toLowerCase()
    );

    if (duplicateName) {
      toast({
        title: 'Jogador já registrado',
        description: `${formData.firstName} ${formData.lastName} já está cadastrado.`,
        variant: 'destructive'
      });
      return;
    }

    const duplicatePhone = players.find((p) => p.phone === formData.phone);
    if (duplicatePhone) {
      toast({
        title: 'Telefone já registrado',
        description: 'Este telefone já está cadastrado.',
        variant: 'destructive'
      });
      return;
    }

    // Adicionar novo jogador
    const newPlayer = {
      id: Date.now().toString(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      goals: 0
    };

    players.push(newPlayer);
    saveMockData('players', players);

    toast({
      title: 'Sucesso!',
      description: `${formData.firstName} ${formData.lastName} foi registrado com sucesso!`
    });

    // Limpar formulário
    setFormData({ firstName: '', lastName: '', phone: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
              <UserCheck className="text-emerald-600" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Registre-se</h1>
            <p className="text-gray-600">Faça seu cadastro para participar do campeonato</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="firstName" className="text-gray-700 font-medium">
                Nome *
              </Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="mt-2 h-12 text-lg"
                placeholder="Digite seu nome"
              />
            </div>

            <div>
              <Label htmlFor="lastName" className="text-gray-700 font-medium">
                Sobrenome *
              </Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="mt-2 h-12 text-lg"
                placeholder="Digite seu sobrenome"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-gray-700 font-medium">
                Telefone (DDD + 9 dígitos) *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="mt-2 h-12 text-lg"
                placeholder="(11) 99999-9999"
                maxLength={15}
              />
              <p className="text-sm text-gray-500 mt-1">Formato: (11) 99999-9999</p>
            </div>

            <Button
              type="submit"
              className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold mt-8"
            >
              Registrar Jogador
            </Button>
          </form>

          <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <p className="text-sm text-emerald-800">
              <strong>Importante:</strong> Cada pessoa pode se registrar apenas uma vez. 
              Não será possível cadastrar o mesmo nome ou telefone novamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registre;