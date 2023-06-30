import { useState } from "react";
import { FlatList } from "react-native";

import { Header } from "@components/Header";
import { HighLight } from "@components/HightLight";
import { Input } from "@components/Input";
import { ButtonIcon } from "@components/Buttonicon";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { Button } from "@components/Button";

export function Players() {
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState(['Marcio','Borges','James','Santana','Joaquim','Ribeiro','Carol']);

    return (
        <Container>
            <Header showBackButton />

            <HighLight
                title="Nome da turma"
                subtitle="adicione a galera e separe os times"
            />

            <Form>
                <Input
                    placeholder="Nome do jogador"
                    autoCorrect={false}
                />

                <ButtonIcon 
                    icon="add"
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
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <PlayerCard 
                        name={item}
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