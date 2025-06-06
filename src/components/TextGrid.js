import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import bannerImage1 from '../images/Freslatte_refrigeration_1.webp';
import bannerImage2 from '../images/Freslatte_refrigeration_2.png';

function HomeText() {
    return (
        <Container>


<Row className='Texto1'>
  <Col m={8}>
    <h3>Quem somos</h3>
    <p>
      O nome “Freslatte Refrigeration” surgiu da nossa missão: desenvolver soluções para a refrigeração do leite, garantindo qualidade e segurança para os produtores.
    </p>

    <h3>Identidade Visual</h3>
    <p>
      Nossa logo traz uma vaca, representando o bem-estar animal, e uma ventoinha, simbolizando nosso foco em refrigeração. Escolhemos o verde, por transmitir saúde e crescimento, e tipografias que equilibram modernidade e leveza, refletindo os valores da marca.
    </p>

    <h3>O Projeto</h3>
    <p>
      Nosso projeto busca resolver o problema enfrentado por produtores na conservação do leite logo após a ordenha. Desenvolvemos um protótipo de refrigerador que mantém o leite entre 16°C e 18°C, utilizando sensores e Arduino para controle automático da temperatura, prevenindo a proliferação de bactérias.
    </p>
  </Col>
  <Col m={4}><img src={bannerImage1} alt="Imagem 1" /></Col>
</Row>

<Row className='Texto2'>
  <Col m={4}><img src={bannerImage2} alt="Imagem 2" /></Col>
  <Col m={8}>
    <h3>Problema Observado</h3>
    <p>
      Percebemos que um grande problema enfrentado pelos produtores está relacionado à refrigeração adequada do local onde o leite é armazenado logo após a ordenha. A falta desse controle de temperatura compromete a qualidade e segurança do leite.
    </p>

    <h3>Ideia do Projeto</h3>
    <p>
      Durante nossas pesquisas sobre os desafios do mercado, identificamos essa necessidade crítica de refrigeração. A partir disso, surgiu a proposta de desenvolver um protótipo de sistema de refrigeração para uma leitaria, utilizando conhecimentos de Arduino e programação para oferecer uma solução eficiente e acessível.
    </p>

    <h3>Objetivo do Projeto</h3>
    <p>
      O principal objetivo do nosso protótipo é garantir a qualidade e segurança do leite, mantendo a temperatura ideal entre 16°C e 18°C. O sistema contará com sensores que farão o monitoramento em tempo real e, caso ocorra alguma variação, o sistema ajustará automaticamente a temperatura para os parâmetros ideais, prevenindo a proliferação de bactérias.
    </p>
  </Col>
</Row>

        </Container>
    )
}

export default HomeText;