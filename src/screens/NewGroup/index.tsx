import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

import { Container, Content, Icon } from "./styles";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { HighLight } from "@components/HightLight";

export function NewGroup() {
    const [group, setGroup] = useState('');

    const navigation = useNavigation();

    async function handleNewGroup() {
        try {

            if ( group.trim().length === 0) {
                
                return Alert.alert('Nova Turma', 'Informe o nome da turma!');

            }
            
            await groupCreate(group);
            navigation.navigate('players', { group: group });
            
        } catch (error) {

            if (error instanceof AppError) {
            
                Alert.alert('Nova Turma', error.message);
            
            } else {
                
                Alert.alert('Nova Turma', 'Não foi possível criar uma nova turma!');
                console.log(error);

            }
           

        }

    }

    return (
        <Container>
            <Header showBackButton />

            <Content>
                <Icon />

                <HighLight
                    title="Nova Turma"
                    subtitle="Crie uma turma para adicionar pessoas"
                />

                <Input 
                    placeholder="Nome da Turma"
                    onChangeText={setGroup}
                />

                <Button
                    title="Criar" 
                    style={{marginTop: 20}}
                    onPress={handleNewGroup}
                />
            </Content>

        </Container>
    );
}