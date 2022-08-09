import React, {FC, useState} from 'react';
import ClientInfo from "./ClientInfo";
import {useAppDispatch, useAppSelector} from "../hooks/useAppSelector";
import {Button, Form, Input, Modal} from "antd";
import {addNewClient} from "../store/reducers/client";
import {v4 as uuidv4} from "uuid";
import {useParams} from "react-router-dom";
import '../styles/SearchClient.css';



const SearchClient: FC = () => {
    const {id} = useParams<{ id: string }>();
    const SearchClient = useAppSelector((state) => state.client.ClientList)
    const client = useAppSelector((state) => state.client.ClientList.find((client) => client.id === id));
    const dispatch = useAppDispatch();

    const [value, setValue] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState<string | undefined>(client?.name || '');
    const [city, setCity] = useState<string | undefined>(client?.city || '');
    const [number, setNumber ] = useState<string | undefined>(client?.number || '');
    const [age, setAge] = useState<string | undefined>(client?.age || '');

    const clearInputs = () => {
        setName('');
        setCity('');
        setNumber('');
        setAge('');
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        dispatch(addNewClient({name, city, age, number, id: uuidv4() }));
        clearInputs();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const filteredClient = SearchClient.filter(client => {
        return client.name?.toLowerCase().includes(value.toLowerCase())
    })

    return (
        <div className='Glav'>
            <form className="SearchInp">
                <Input type="text" placeholder="Введите имя" onChange={(e) => setValue(e.target.value)}/>
            </form>
            <div>
                <Button type="primary" onClick={showModal}>
                    Добавить контакт
                </Button>
                <Modal title="Добавить контакт" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Form>
                        <p>Имя</p>
                        <Form.Item>
                            <Input
                                value={name}
                                placeholder="Введите имя"
                                onChange={(e) => setName(e.currentTarget.value)}
                            />
                        </Form.Item>
                        <p>Город</p>
                        <Form.Item>
                            <Input
                                value={city}
                                placeholder="Введите город"
                                onChange={(e) => setCity(e.currentTarget.value)}
                            />
                        </Form.Item>
                        <p>Номер</p>
                        <Form.Item>
                            <Input
                                value={number}
                                placeholder="Введите номер"
                                onChange={(e) => setNumber(e.currentTarget.value)}
                            />
                        </Form.Item>
                        <p>Возраст</p>
                        <Form.Item>
                            <Input
                                value={age}
                                placeholder="Введите возраст"
                                onChange={(e) => setAge(e.currentTarget.value)}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
            <div>
                {filteredClient.map((client) => (
                    <ClientInfo key={client.id} id={client.id} name={client.name} city={client.city} number={client.number} age={client.age}/>
                ))}
            </div>
        </div>
    );
};
export default SearchClient;