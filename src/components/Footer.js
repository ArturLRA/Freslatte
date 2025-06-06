import React from 'react';

export default function HomeFooter() {
    return (
        <footer className="mainFooter">
            <div className="container">
                <div className="row">
                    {/* Coluna 1 */}
                    <div className="colunaFooter">
                        <h4>Freslatte</h4>
                        <p>O nome “Freslatte Refrigeration” surgiu da nossa missão: desenvolver soluções para a refrigeração do leite, garantindo qualidade e segurança para os produtores  .</p>
                    </div>

                    {/* Coluna 2 */}
                    <div className="colunaFooter">
                    <h4>Páginas</h4>
                    <ul className="itemsFooter">
                    <li><a href="/" className="footerButton">Home</a></li>
                    <li><a href="/Shop" className="footerButton">Loja</a></li>
                    </ul>
                    </div>

                    {/* Coluna 3 */}
                    <div className="colunaFooter">
                        <h4>Tags</h4>
                        <div className="tags">
                            <span>Leite</span>
                            <span>Natural</span>
                            <span>Fresco</span>
                            <span>Saudável</span>
                        </div>
                    </div>

                    {/* Coluna 4 */}
                    <div className="colunaFooter">
                        <h4>Feedback</h4>
                        <form className="subscribeForm">
                            <input type="email" placeholder="Deixe seu Feedback" />
                            <button type="submit">→</button>
                        </form>
                        <div className="social">
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>

                <div className="direitoFooter">
                    <p>© {new Date().getFullYear()} Freslatte. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
