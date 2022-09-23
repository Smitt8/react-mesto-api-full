function Footer() {
  let copy = String.fromCodePoint(0x000A9);

  return (
    <footer className="footer">
    <p className="footer__copyright">{copy} 2022 Mesto Russia</p>
  </footer>
  );
}

export default Footer;