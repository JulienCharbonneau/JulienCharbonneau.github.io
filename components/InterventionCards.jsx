import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function InterventionCard() {
  return (
    <Card style={{ width: "18rem", padding: "10px", margin: "3px" }}>
      <Card.Body>
        <Card.Title>Intervention</Card.Title>
        <Card.Text>Intervention id:</Card.Text>
        <Card.Text>Building id:</Card.Text>
        <Card.Text>Battery id:</Card.Text>
        <Card.Text>Column id:</Card.Text>
        <Card.Text>Elevator id:</Card.Text>
        <Card.Text>Elevator id:</Card.Text>
        <Card.Text>Status:</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default InterventionCard;
