import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav style={{ 
      padding: '1rem', 
      borderBottom: '1px solid #ccc', 
      marginBottom: '2rem',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          textDecoration: 'none',
          color: '#333'
        }}>
          📞 Contact Book
        </Link>
        
        <Link 
          to="/add"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          ➕ Add Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;