import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { groupsGetAll } from "./groupsGetAll";
import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function groupCreate(newGroup: string) {
    try {        
        const storedGroups = await groupsGetAll();
        const groupAlredyExists = storedGroups.includes(newGroup);

        if (groupAlredyExists) {
            throw new AppError('Já existe uma turma com esse nome!');
        }

        const storage = JSON.stringify([...storedGroups, newGroup]);
        await AsyncStorage.setItem(GROUP_COLLECTION, storage);

    } catch(error) {

        throw error;

    }
}