export default function Section({ title, children }) {
    return (
        <section style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '20px' }}>
            <h2 style={{ marginBottom: '15px', color: '#333' }}>{title}</h2>
            {children}
        </section>
    );
}