import React from 'react';

export default function HomeFooter() {
    return (
        <footer className="mainFooter">
            <div className="container">
                <div className="row">
                    {/* Coluna 1 */}
                    <div className="colunaFooter">
                        <h4>Freslatte</h4>
                        <p>Uma breve descrição sobre a empresa ou projeto.</p>
                        <a href="#">Leia mais →</a>
                    </div>

                    {/* Coluna 2 */}
                    <div className="colunaFooter">
                        <h4>Categorias</h4>
                        <ul className="itemsFooter">
                            <li>Produto A</li>
                            <li>Serviço B</li>
                            <li>Sobre Nós</li>
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
                        <h4>Inscreva-se</h4>
                        <form className="subscribeForm">
                            <input type="email" placeholder="Digite seu email" />
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
