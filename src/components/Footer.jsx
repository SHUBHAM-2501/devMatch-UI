export default function Footer(){
    return <>
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4" style={{ position: 'fixed', bottom: 0, width: '100%' }}>
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
  </aside>
</footer>
    </>
}