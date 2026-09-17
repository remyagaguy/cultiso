"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { ArrowUpOutlined, ArrowDownOutlined, DollarOutlined, PlusOutlined } from "@ant-design/icons";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

interface TreasuryDashboardProps {
  draftTransaction?: {
    amount?: number;
    type?: string;
    category?: string;
    description?: string;
  } | null;
}

export default function TreasuryDashboard({ draftTransaction }: TreasuryDashboardProps) {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [cultisoId, setCultisoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (draftTransaction) {
      setAmount(draftTransaction.amount?.toString() || "");
      setType(draftTransaction.type || "expense");
      setCategory(draftTransaction.category || "");
      setDescription(draftTransaction.description || "");
      setIsModalOpen(true);
    }
  }, [draftTransaction]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return;

      // Récupérer le premier Cultiso (Jumeau Numérique)
      const { data: cultisos } = await supabase
        .from("cultisos")
        .select("id")
        .eq("user_id", userData.user.id)
        .limit(1);

      if (cultisos && cultisos.length > 0) {
        const cId = cultisos[0].id;
        setCultisoId(cId);

        // Fetch transactions
        const { data: txData } = await supabase
          .from("transactions")
          .select("*")
          .eq("cultiso_id", cId)
          .order("date", { ascending: false })
          .order("created_at", { ascending: false });

        if (txData) setTransactions(txData);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cultisoId) return;

    try {
      const { data, error } = await supabase.from("transactions").insert({
        cultiso_id: cultisoId,
        amount: parseFloat(amount),
        type,
        category,
        description,
        date: new Date().toISOString().split("T")[0]
      }).select();

      if (!error && data) {
        setTransactions([data[0], ...transactions]);
        setIsModalOpen(false);
        setAmount("");
        setCategory("");
        setDescription("");
      }
    } catch (err) {
      console.error("Error adding transaction", err);
    }
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="p-8 max-w-5xl mx-auto font-manrope">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-unbounded font-bold text-[#17231F]">Trésorerie</h2>
          <p className="text-[#6E8A75] mt-1">Gérez vos entrées et sorties d'argent.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#D35400] hover:bg-[#A04000] text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-sm"
        >
          <PlusOutlined />
          Nouvelle Transaction
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <ArrowUpOutlined className="text-lg" />
            </div>
            <h3 className="text-gray-500 font-medium">Entrées (Revenus)</h3>
          </div>
          <p className="text-3xl font-bold text-[#17231F]">{totalIncome.toLocaleString('fr-FR')} <span className="text-lg text-gray-400 font-medium">FCFA</span></p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center">
              <ArrowDownOutlined className="text-lg" />
            </div>
            <h3 className="text-gray-500 font-medium">Sorties (Dépenses)</h3>
          </div>
          <p className="text-3xl font-bold text-[#17231F]">{totalExpense.toLocaleString('fr-FR')} <span className="text-lg text-gray-400 font-medium">FCFA</span></p>
        </div>

        <div className="bg-[#0B5345] p-6 rounded-2xl shadow-md flex flex-col justify-between text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <DollarOutlined className="text-lg" />
            </div>
            <h3 className="text-white/80 font-medium">Solde Actuel</h3>
          </div>
          <p className="text-3xl font-bold">{balance.toLocaleString('fr-FR')} <span className="text-lg text-white/60 font-medium">FCFA</span></p>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-bold text-[#17231F]">Historique des transactions</h3>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-gray-400">Chargement...</div>
        ) : transactions.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <DollarOutlined className="text-2xl text-gray-400" />
            </div>
            <h4 className="text-lg font-bold text-gray-700 mb-2">Aucune transaction</h4>
            <p className="text-gray-500 max-w-md">Commencez à gérer votre trésorerie en ajoutant vos premières dépenses (intrants, salaires) ou revenus (ventes).</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Catégorie</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium text-right">Montant</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600">{tx.date}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{tx.description || '-'}</td>
                  <td className={`px-6 py-4 text-sm font-bold text-right ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'income' ? '+' : '-'}{Number(tx.amount).toLocaleString('fr-FR')} FCFA
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-[#17231F]">Nouvelle Transaction</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <form onSubmit={handleAddTransaction} className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Type d'opération</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    type="button"
                    onClick={() => setType('income')}
                    className={`p-2 text-sm font-medium rounded-lg border ${type === 'income' ? 'bg-green-50 border-green-200 text-green-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    Rentrée d'argent
                  </button>
                  <button 
                    type="button"
                    onClick={() => setType('expense')}
                    className={`p-2 text-sm font-medium rounded-lg border ${type === 'expense' ? 'bg-red-50 border-red-200 text-red-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    Dépense
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Montant (FCFA)</label>
                <input 
                  type="number" 
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5345] focus:border-transparent"
                  placeholder="Ex: 50000"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                <input 
                  type="text" 
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5345] focus:border-transparent"
                  placeholder="Ex: Semences, Vente maïs, Salaire..."
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optionnel)</label>
                <input 
                  type="text" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5345] focus:border-transparent"
                  placeholder="Ex: Achat de 2 sacs de NPK"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#0B5345] hover:bg-[#072F27] text-white py-3 rounded-xl font-bold transition-colors"
              >
                Enregistrer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
