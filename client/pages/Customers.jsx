import SiteLayout from '../components/SiteLayout.jsx';

export default function Customers(){
  return (
    <SiteLayout>
      <section className="rider-commissions">
        <header className="rc-header">
          <h2 className="rc-title">Customers</h2>
          <p className="rc-subtitle">Manage your customer directory.</p>
        </header>
        <div className="section-note">Customer management will appear here once connected to your data source.</div>
      </section>
    </SiteLayout>
  );
}
