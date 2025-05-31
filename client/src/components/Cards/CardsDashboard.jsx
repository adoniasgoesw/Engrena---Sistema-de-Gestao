import React from 'react';
import CardDashboardItem from './CardDashboardItem';
import { FaCheckCircle, FaSpinner, FaMoneyBillWave, FaUsers } from 'react-icons/fa';

const CardsDashboard = () => {
  const data = [
    {
      title: 'OS Finalizadas',
      value: '128',
      color: '#275b9d',
      icon: FaCheckCircle,
    },
    {
      title: 'OS em Andamento',
      value: '42',
      color: '#74a9ee',
      icon: FaSpinner,
    },
    {
      title: 'Faturamento Mensal',
      value: 'R$ 18.750,00',
      color: '#007883',
      icon: FaMoneyBillWave,
    },
    {
      title: 'Clientes Ativos',
      value: '234',
      color: '#5271ff',
      icon: FaUsers,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">

      {data.map((item, index) => (
        <CardDashboardItem
          key={index}
          title={item.title}
          value={item.value}
          color={item.color}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default CardsDashboard;
