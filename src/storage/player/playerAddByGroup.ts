import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
    try {
        
        const storedPlayers = await playersGetByGroup(group);
        const playerAlredyExists = storedPlayers.filter(player => player.name === newPlayer.name);
        
        if (playerAlredyExists.length > 0) {
            throw new AppError('Já existe um jogador com esse nome no time ' );
        }

        const storage = JSON.stringify([...storedPlayers, newPlayer]);

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);

    } catch (error) {
        
        throw error;

    }
    
}

