import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { HighLight } from "@components/HightLight";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function NewGroup() {
    return (
        <Container>
            <Header showBackButton />

            <Content>
                <Icon />

                <HighLight
                    title="Nova turma"
                    subtitle="crie a turma para adicionar pessoas"
                />

                <Input 
                    placeholder="Nome da turma"
                />

                <Button
                    title="Criar" 
                    style={{marginTop: 20}}
                />
            </Content>

        </Container>
    );
}