"use client";

import { useState, useEffect } from 'react';
import { Search, Plus, X, Edit2, Trash2, Mail, Building2, MapPin, User } from 'lucide-react';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    city: ''
  });


  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      const formattedData = data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.company.name,
        city: user.address.city
      }));
      
      setLeads(formattedData);
      setFilteredLeads(formattedData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = leads.filter(lead => 
      lead.name.toLowerCase().includes(term) || 
      lead.company.toLowerCase().includes(term)
    );
    setFilteredLeads(filtered);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  
  const handleAddLead = (e) => {
    e.preventDefault();
    
    const newLead = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      company: formData.company,
      city: formData.city
    };

    const updatedLeads = [newLead, ...leads];
    setLeads(updatedLeads);
    setFilteredLeads(updatedLeads);
    
    
    setFormData({ name: '', email: '', company: '', city: '' });
    setShowForm(false);
  };

  const handleEditClick = (lead) => {
    setEditingLead(lead.id);
    setFormData({
      name: lead.name,
      email: lead.email,
      company: lead.company,
      city: lead.city
    });
    setShowForm(true);
  };

  const handleUpdateLead = (e) => {
    e.preventDefault();
    
    const updatedLeads = leads.map(lead => 
      lead.id === editingLead 
        ? { ...lead, ...formData }
        : lead
    );
    
    setLeads(updatedLeads);
    setFilteredLeads(updatedLeads);
    setFormData({ name: '', email: '', company: '', city: '' });
    setShowForm(false);
    setEditingLead(null);
  };
 
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      const updated = leads.filter(lead => lead.id !== id);
      setLeads(updated);
      setFilteredLeads(updated);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingLead(null);
    setFormData({ name: '', email: '', company: '', city: '' });
  };

  if (loading) {
    return (
      <div className="flex items-center w-11 m-auto min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Leads Management</h1>
          <p className="text-gray-600">Manage your customer leads efficiently</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or company..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            <Plus size={20} />
            Add New Lead
          </button>
        </div>
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editingLead ? 'Edit Lead' : 'Add New Lead'}
              </h2>
              <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={editingLead ? handleUpdateLead : handleAddLead} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Company Inc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="New York"
                />
              </div>

              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  {editingLead ? 'Update Lead' : 'Add Lead'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-800">{filteredLeads.length}</span> of <span className="font-semibold text-gray-800">{leads.length}</span> leads
          </p>
        </div>
        {filteredLeads.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg">No leads found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                    <User className="text-white" size={24} />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(lead)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(lead.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">{lead.name}</h3>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={16} />
                    <span className="text-sm">{lead.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building2 size={16} />
                    <span className="text-sm">{lead.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} />
                    <span className="text-sm">{lead.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leads;