import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import bannerImage1 from '../images/bannerImage1.jpg';

function HomeText() {
    return (
        <Container>

            <Row>
                <Col m={8}></Col>
                <Col m={4}><img src={bannerImage1} alt="Imagem 1" /></Col>
            </Row>

            <Row>
                <Col m={4}><img src={bannerImage1} alt="Imagem 2" /></Col>
                <Col m={8}></Col>
                
            </Row>

        </Container>
    )
}

export default HomeText;