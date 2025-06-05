import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import NavBarShop from '../components/NavBarShop';

function Shop() {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [busca, setBusca] = useState('');

  // Filtros
  const [categoria, setCategoria] = useState('');
  const [precoMin, setPrecoMin] = useState('');
  const [precoMax, setPrecoMax] = useState('');

  // Carrega os produtos
  useEffect(() => {
    fetch('http://localhost:3001/produtos')
      .then(res => res.json())
      .then(data => {
        setProdutos(data);
        setProdutosFiltrados(data);
      })
      .catch(err => console.error('Erro ao buscar produtos: ', err));
  }, []);

  // Atualiza produtos filtrados
  useEffect(() => {
    let filtrados = produtos.filter(prod => 
      prod.nome.toLowerCase().includes(busca.toLowerCase())
    );

    if (categoria) {
      filtrados = filtrados.filter(prod => prod.categoria === categoria);
    }

    if (precoMin) {
      filtrados = filtrados.filter(prod => parseFloat(prod.preco) >= parseFloat(precoMin));
    }

    if (precoMax) {
      filtrados = filtrados.filter(prod => parseFloat(prod.preco) <= parseFloat(precoMax));
    }

    setProdutosFiltrados(filtrados);
  }, [busca, categoria, precoMin, precoMax, produtos]);

  return (
    <div>
      <NavBarShop
        busca={busca}
        setBusca={setBusca}
        categoria={categoria}
        setCategoria={setCategoria}
        precoMin={precoMin}
        setPrecoMin={setPrecoMin}
        precoMax={precoMax}
        setPrecoMax={setPrecoMax}
      />
      <ProductCard produtos={produtosFiltrados} />
    </div>
  );
}

export default Shop;