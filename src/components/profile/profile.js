import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {v4 as uuidv4} from 'uuid';

import { Header } from "../header/header";
import { apiService } from '../../api/api-handlers';
import { getUserLocal } from '../../shared/services/local-storage-service';
import { async } from '@firebase/util';

export const profileHandler = () => {
    const body = document.getElementsByTagName('body')[0];
    const photoInput = document.getElementById('photo');
    const storage = getStorage();

    photoInput.oninput = event => {
        const file = event.target.files[0];
        const fileName = `${uuidv4()}_${event.target.files[0].name}`
        const storageRef = ref(storage, 'photo/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                console.log('Upload is ' + progress + '% done');
            }, 
            () => {},
             async () => {
                let photo = '';
                const user = getUserLocal();
                const { userId } = user;

                delete user.userId;

                console.log('start');

                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    photo = downloadURL;

                    apiService.put(`users/${userId}`, {...user, photo}).then(res => console.log('ok', res));
                });
                
            }
        );  

    }
    
    Header.getHeader(body);

}