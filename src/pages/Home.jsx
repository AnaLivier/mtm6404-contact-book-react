import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import db from '../db';

function Home() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const q = query(collection(db, 'contacts'), orderBy('lastName'));
        const querySnapshot = await getDocs(q);
        
        const contactsData = [];
        querySnapshot.forEach((doc) => {
          contactsData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Filter contacts
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact => {
        const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
      });
      setFilteredContacts(filtered);
    }
  }, [searchTerm, contacts]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading contacts...</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
      <h1>Contact Book</h1>
      
      {/* Search Box */}
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search contacts by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Contact Count */}
      <p style={{ color: '#666', marginBottom: '1rem' }}>
        {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''} found
      </p>

      {/* Contact List */}
      {filteredContacts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
          {contacts.length === 0 ? (
            <>
              <p>No contacts found.</p>
              <Link to="/add" style={{ color: '#007bff' }}>Add your first contact</Link>
            </>
          ) : (
            <p>No contacts match your search.</p>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <Link
                to={`/contact/${contact.id}`}
                style={{
                  textDecoration: 'none',
                  color: '#333',
                  display: 'block'
                }}
              >
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#007bff' }}>
                  {contact.firstName} {contact.lastName}
                </h3>
                <p style={{ margin: '0', color: '#666' }}>
                  📧 {contact.email}
                </p>
                {contact.phone && (
                  <p style={{ margin: '0.25rem 0 0 0', color: '#666' }}>
                    📱 {contact.phone}
                  </p>
                )}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;