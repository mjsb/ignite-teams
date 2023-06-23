import { useState } from 'react';
import { FlatList } from 'react-native';

import { Header } from '@components/Header';
import { HighLight } from '@components/HightLight';
import { GroupCard } from '@components/Card';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container } from './styles';

export function Groups() {
    const [groups, setGroups] = useState<string[]>([]);

    return (
        <Container>
            <Header />

            <HighLight 
                title='Turmas'
                subtitle='jogue com a sua turma'
            />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <GroupCard 
                        title={item}
                    />                    
                )}
                contentContainerStyle={
                    groups.length === 0 && {
                        flex: 1, 
                        marginTop: -130
                    }
                }
                ListEmptyComponent={() => (
                    <ListEmpty 
                        message="Nenhum grupo cadastrado!"  
                    />
                )}
            />

            <Button 
                title='Criar nova turma'
            />
        </Container>
    );
}
