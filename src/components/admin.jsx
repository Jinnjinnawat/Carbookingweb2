// src/pages/AdminPage.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { Button, Form, Table } from 'react-bootstrap';

function AdminPage() {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ name: '', model: '', price: '' });

  useEffect(() => {
    const fetchCars = async () => {
      const querySnapshot = await getDocs(collection(db, "cars"));
      setCars(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchCars();
  }, []);

  const handleAddCar = async () => {
    try {
      await addDoc(collection(db, "cars"), newCar);
      setNewCar({ name: '', model: '', price: '' });
    } catch (error) {
      console.error("Error adding car: ", error);
    }
  };

  const handleEditCar = async (id, updatedCar) => {
    try {
      const carDoc = doc(db, "cars", id);
      await updateDoc(carDoc, updatedCar);
    } catch (error) {
      console.error("Error updating car: ", error);
    }
  };

  return (
    <div>
      <h2>Admin Car Rental Management</h2>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Car Name</Form.Label>
          <Form.Control
            type="text"
            value={newCar.name}
            onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Model</Form.Label>
          <Form.Control
            type="text"
            value={newCar.model}
            onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={newCar.price}
            onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddCar}>Add Car</Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Car Name</th>
            <th>Model</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.name}</td>
              <td>{car.model}</td>
              <td>{car.price}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditCar(car.id, { ...car, price: car.price + 100 })}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminPage;
