

import { FaSnapchatGhost } from "react-icons/fa";
import { FaXTwitter, FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa6'
import { Link } from "react-router-dom"
import '../styles/footer.css'



export default function Footer() {

    return (
        
        <div className="conteneur">
            <footer className="footer">
                <section className="principal">
                    <div className="element element1">
                        <h2 className="titre 1">a propos</h2>
                        <ul>
                            <li><Link>service</Link></li>
                            <li><Link>portefolio</Link></li>
                            <li><Link>tarification</Link></li>
                            <li><Link>client</Link></li>
                            <li><Link>carrière</Link></li>
                        </ul>
                    </div>
                    <div className="element element2">
                        <h2 className="titre 2">ressource</h2>
                        <ul>
                            <li><Link>docs</Link></li>
                            <li><Link>blogs</Link></li>
                            <li><Link>ebooks</Link></li>
                            <li><Link>webinars</Link></li>
                        </ul>
                    </div>
                    <div className="element element3">
                        <h2 className="titre 3">contact</h2>
                        <ul>
                            <li><Link>aides</Link></li>
                            <li><Link>vente</Link></li>
                            <li><Link>annonces</Link></li>
                        </ul>
                    </div>
                </section>
                <hr />
                <section className="social">
                    <ul className="liste-social">
                        <li><Link><FaXTwitter /></Link></li>
                        <li><Link><FaFacebookF /></Link></li>
                        <li><Link><FaInstagram /></Link></li>
                        <li><Link><FaGithub /></Link></li>
                        <li><Link><FaSnapchatGhost /></Link></li>
                    </ul> 
                </section>

                <section className="legal">
                    <ul className="liste-legal">
                        <li>term & condition</li>
                        <li>privacy policy</li>
                        <li>2025 copyright</li>
                    </ul>
                </section>
            </footer>
        </div>
    
    )
}