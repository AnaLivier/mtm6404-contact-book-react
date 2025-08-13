import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import db from '../db';

function ContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const docRef = doc(db, 'contacts', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setContact({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('No such contact!');
        }
      } catch (error) {
        console.error('Error fetching contact:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${contact.firstName} ${contact.lastName}?`)) {
      setDeleting(true);
      try {
        await deleteDoc(doc(db, 'contacts', id));
        navigate('/'); // back home
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Error deleting contact. Please try again.');
        setDeleting(false);
      }
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading contact...</div>;
  }

  if (!contact) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Contact not found</h2>
        <Link to="/" style={{ color: '#007bff' }}>← Back to contacts</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 1rem' }}>
      {/* Back Button */}
      <Link 
        to="/" 
        style={{ 
          color: '#007bff', 
          textDecoration: 'none',
          marginBottom: '1rem',
          display: 'inline-block'
        }}
      >
        ← Back to contacts
      </Link>

      {/* Contact Info Card */}
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '2rem',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '1rem'
      }}>
        <h1 style={{ margin: '0 0 1rem 0', color: '#333' }}>
          {contact.firstName} {contact.lastName}
        </h1>

        <div style={{ marginBottom: '1rem' }}>
          <strong>📧 Email:</strong>
          <p style={{ margin: '0.25rem 0', fontSize: '1.1rem' }}>
            <a href={`mailto:${contact.email}`} style={{ color: '#007bff' }}>
              {contact.email}
            </a>
          </p>
        </div>

        {contact.phone && (
          <div style={{ marginBottom: '1rem' }}>
            <strong>📱 Phone:</strong>
            <p style={{ margin: '0.25rem 0', fontSize: '1.1rem' }}>
              <a href={`tel:${contact.phone}`} style={{ color: '#007bff' }}>
                {contact.phone}
              </a>
            </p>
          </div>
        )}

        {contact.address && (
          <div style={{ marginBottom: '1rem' }}>
            <strong>🏠 Address:</strong>
            <p style={{ margin: '0.25rem 0', fontSize: '1.1rem' }}>
              {contact.address}
            </p>
          </div>
        )}

        {contact.company && (
          <div style={{ marginBottom: '1rem' }}>
            <strong>🏢 Company:</strong>
            <p style={{ margin: '0.25rem 0', fontSize: '1.1rem' }}>
              {contact.company}
            </p>
          </div>
        )}

        {contact.notes && (
          <div style={{ marginBottom: '1rem' }}>
            <strong>📝 Notes:</strong>
            <p style={{ margin: '0.25rem 0', fontSize: '1.1rem' }}>
              {contact.notes}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link
          to={`/edit/${contact.id}`}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          ✏️ Edit Contact
        </Link>

        <button
          onClick={handleDelete}
          disabled={deleting}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: deleting ? '#ccc' : '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: deleting ? 'not-allowed' : 'pointer'
          }}
        >
          {deleting ? '🔄 Deleting...' : '🗑️ Delete Contact'}
        </button>
      </div>
    </div>
  );
}

export default ContactDetails;