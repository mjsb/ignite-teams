import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { HighLight } from "@components/HightLight";
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

                <Button
                    title="Criar" 
                />
            </Content>

        </Container>
    );
}