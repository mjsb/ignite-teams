import { useCallback, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { groupsGetAll } from '@storage/group/groupsGetAll';

import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { GroupCard } from '@components/Card';
import { Loading } from '@components/Loading';
import { ListEmpty } from '@components/ListEmpty';
import { HighLight } from '@components/HightLight';

import { Container } from './styles';

export function Groups() {
    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState<string[]>([]);
    const navigation = useNavigation();
    
    function handleNewGroup() {
        navigation.navigate('new');
    }

    async function fetchGroup() {
        try {
            
            setIsLoading(true);
            const data = await groupsGetAll();
            setGroups(data);
            
        } catch (error) {
            
            console.log(error);
            Alert.alert('Não foi possível carregar as turmas!')
            
        } finally {

            setIsLoading(false);

        }
        
    }

    function handleOpenGroup(group: string) {

        navigation.navigate('players', { group });

    }

    useFocusEffect(useCallback(() => {
        fetchGroup();
    }, []));

    return (
        <Container>
            <Header />

            <HighLight 
                title='Turmas'
                subtitle='Jogue com a sua turma'
            />

            { isLoading ? <Loading /> :
            
                <FlatList
                    data={groups}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <GroupCard 
                            title={item}
                            onPress={() => handleOpenGroup(item)}
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
                            message="Nenhuma turma cadastrada!"  
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />

            }

            <Button 
                title='Criar nova turma'
                onPress={handleNewGroup}
            />
        </Container>
    );
}
