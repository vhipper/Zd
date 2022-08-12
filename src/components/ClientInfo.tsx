import  { deleteClient, updateClient} from '../store/reducers/client/index';
import {useAppDispatch, useAppSelector} from "../hooks/useAppSelector";
import {Card, Form, Input, Modal} from "antd";
import React, {useState} from "react";
import "../styles/ClientInfo.css";

const ClientInfo = ({ id
                  }
                  :
                      {
                          id: string;
                          name: string | undefined;
                          city: string | undefined;
                          number: string | undefined;
                          age: string | undefined;
                      }) => {
    const dispatch = useAppDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const client = useAppSelector((state) => state.client.ClientList.find((client) => client.id === id));

    const [name, setName] = useState<string | undefined>(client?.name || '');
    const [city, setCity] = useState<string | undefined>(client?.city || '');
    const [number, setNumber ] = useState<string | undefined>(client?.number || '');
    const [age, setAge] = useState<string | undefined>(client?.age || '');


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = (id: string) => {
        if (id) {
            dispatch(updateClient({name, city, age, number, id}));
            setIsModalVisible(false);
        }
    };

    return (
        <div className="Dv">
            <Card className="Crd">
                <p>Имя: {name}</p>
                <p>Город: {city}</p>
                <p>Номер телефона: {number}</p>
                <p>Возраст: {age}</p>
                <button
                    className="Delete" onClick={() => dispatch(deleteClient({ id }))}
                />
                <button
                    className="Edit" onClick={showModal}
                />
            </Card>
            <div>
                    <Modal
                        maskClosable={false}
                        keyboard={false}
                        closable={false}
                        cancelButtonProps={{ style: { display: 'none' } }}
                        title="Изменить контакт"
                        visible={isModalVisible}
                        onOk={() => handleOk(id)}
                    >
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
            </div>
    );
};
export default ClientInfo;
