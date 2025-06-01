import React from 'react';

export default function HomeFooter() {
    return (
        <div className="mainFooter">
        <div className="container">
        <div className="row">
        {/* Coluna 1*/}
        <div className="colunaFooter">
        <h4>Coluna 1</h4>
        <ul className="itemsFooter">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
        </div>

        {/* Coluna 2*/}
        <div className="colunaFooter">
        <h4>Coluna 2</h4>
        <ul className="itemsFooter">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
        </div>

        </div>
        <div className="direitoFooter">
            <p>
                $copy;{new Date().getFullYear()} Freslatte. Todos os direitos reservados.
            </p>
        </div>
        </div>
        </div>
    );
}