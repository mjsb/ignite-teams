import { useState, useEffect, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import { FlatList, Alert, TextInput } from "react-native";

import { AppError } from "@utils/AppError";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemove ByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";

import { Header } from "@components/Header";
import { HighLight } from "@components/HightLight";
import { Input } from "@components/Input";
import { ButtonIcon } from "@components/Buttonicon";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { Button } from "@components/Button";

type RouteParams = {
    group: string;
}

export function Players() {
    const [newPlayerName, setNewPlayerName] = useState('');
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

    const route = useRoute();
    const { group } = route.params as RouteParams;

    const newPlayerNameInputRef = useRef<TextInput>(null);

    async function handleAddPlayer() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert('Nova pessoa', 'Informe o nome!');
        }

        const newPlayer ={
            name: newPlayerName,
            team,
        }

        try {

            await playerAddByGroup(newPlayer, group);

            newPlayerNameInputRef.current?.blur();

            setNewPlayerName('');
            fetchPlayersByTeam();
            
        } catch (error) {

            if (error instanceof AppError) {
                Alert.alert('Nova pessoa', error.message);
            } else {
                Alert.alert('Nova pessoa', 'Não foi possivel adicionar!');
            }
            
        }
    }

    async function fetchPlayersByTeam() {
        try {

            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam);
            
        } catch (error) {

            console.log(error);
            Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado');
            
        }

        
    }

    async function handlePlayerRemove(playerName: string) {
        try {

            await playerRemoveByGroup(playerName, group);
            fetchPlayersByTeam();
            
        } catch (error) {
            
            console.log(error);
            Alert.alert('Remover pessoa', 'Não foi prossível remover esta pessoa!');
        }
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team]);

    return (
        <Container>
            <Header showBackButton />

            <HighLight
                title={group}
                subtitle="adicione a galera e separe os times"
            />

            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    placeholder="Nome do jogador"
                    autoCorrect={false}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />

                <ButtonIcon 
                    icon="add"
                    onPress={handleAddPlayer}
                />
            </Form> 

            <HeaderList>
                <FlatList 
                    data={['Time A','Time B']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item} 
                            isActive={item === team} 
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />
                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeaderList>

            <FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <PlayerCard 
                        name={item.name}
                        onRemove={() => {}}
                    />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty 
                        message="Não há pessoas neste time"                
                    />                    
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    {paddingBottom: 100},
                    players.length === 0 && { flex: 1 }
                ]}
            />

            <Button
                title="Remover Turma"
                type="SECONDARY"
            />
        </Container>
    )
}