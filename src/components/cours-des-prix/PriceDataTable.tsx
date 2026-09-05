'use client';

import { Table, Tag, Empty } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PriceRecord } from '@/types/prices';

interface PriceDataTableProps {
  data: PriceRecord[];
  loading: boolean;
}

export default function PriceDataTable({ data, loading }: PriceDataTableProps) {
  const getCategoryColor = (category: string) => {
    const upperCategory = category.toUpperCase();
    switch (upperCategory) {
      case 'CEREALE':
        return 'gold';
      case 'INTRANT':
        return 'blue';
      case 'TUBERCULE':
        return 'orange';
      case 'AUTRE':
        return 'green';
      default:
        return 'default';
    }
  };

  const columns: ColumnsType<PriceRecord> = [
    {
      title: 'Produit',
      dataIndex: ['product', 'name'],
      key: 'product_name',
      render: (text) => <span className="font-medium text-gray-900">{text || 'Inconnu'}</span>,
    },
    {
      title: 'Catégorie',
      dataIndex: ['product', 'category'],
      key: 'category',
      responsive: ['sm'],
      render: (category: string) => {
        if (!category) return null;
        return <Tag color={getCategoryColor(category)}>{category.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Prix',
      key: 'price',
      render: (_, record) => (
        <span className="font-medium font-mono-numbers text-[#0B5345]">
          {record.price.toLocaleString('fr-FR')} FCFA <span className="text-[13px] font-normal text-gray-400 font-sans">/ {record.product?.default_unit || 'unité'}</span>
        </span>
      ),
    },
    {
      title: 'Lieu',
      key: 'location',
      render: (_, record) => {
        return <span className="text-gray-600">{record.location || 'Non spécifié'}</span>;
      }
    },
    {
      title: 'Date',
      key: 'record_date',
      responsive: ['md'],
      render: (_, record) => {
        if (!record.record_date) return <span className="text-gray-400">-</span>;
        const date = new Date(record.record_date);
        return <span className="text-gray-600">{date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>;
      }
    },
  ];

  if (!loading && data.length === 0) {
    return (
      <div className="bg-white p-8 rounded-[9px] shadow-sm border border-gray-200 flex items-center justify-center">
        <Empty 
          description={<span className="text-gray-500">Aucun relevé de prix ne correspond à vos filtres.</span>}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[9px] shadow-sm border border-gray-200 overflow-hidden">
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="id"
        loading={loading}
        size="small"
        pagination={{
          defaultPageSize: 15,
          showSizeChanger: true,
          pageSizeOptions: ['15', '30', '50'],
        }}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
}
