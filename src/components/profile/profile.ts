import { getStorage, ref, uploadBytesResumable, getDownloadURL, StorageReference, UploadTask, UploadTaskSnapshot } from 'firebase/storage';
import {v4 as uuidv4} from 'uuid';
import * as moment from 'moment';
import { User } from '../sign-in/sign-in.model';

import { Header } from "../header/header";
import { apiService } from '../../api/api-handlers';
import { getUserLocal, setUserLocal } from '../../shared/services/local-storage-service';
import { FILE_EXTENSIONS } from '../../shared/constants/file-extensions';
import { showNotification } from '../../shared/notifications';
import { ERROR_MESSAGES } from '../../shared/validators';
import { Spinner } from '../../shared/spinner';

export const profileHandler = (): void => {
    const storage = getStorage();
    const user: User = getUserLocal();
    const {firstName, lastName, birth, photo, userId} = user;
    const body = document.getElementsByTagName('body')[0];
    const photoInput = document.getElementById('photo');
    const profilePhoto = document.querySelector('.profile__photo');
    const image = document.createElement('img');
    const firstNameInput = document.getElementById('firstName') as HTMLInputElement;
    const lastNameInput = document.getElementById('lastName') as HTMLInputElement;
    const birthInput = document.getElementById('birth') as HTMLInputElement;
    const editBtn = document.getElementById('editBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    let isEditInProgress = false;

    firstNameInput.value = firstName;
    lastNameInput.value = lastName;
    birthInput.value = moment(birth).format('YYYY-MM-DD');

    image.setAttribute('src', photo || 'src/assets/img/no-avatar.png');
    profilePhoto.append(image);

    editBtn.onclick = async (): Promise<void> => {
        const formControls = document.querySelectorAll('.form-control');


        isEditInProgress = !isEditInProgress;
        formControls.forEach((control: HTMLElement) => 
            isEditInProgress ? control.removeAttribute('disabled') : control.setAttribute('disabled', 'true'));

        if (isEditInProgress) {
            cancelBtn.classList.remove('hidden');
            editBtn.innerText = 'Save';


        } else {
            const newBirth = moment(birthInput.value).isValid() ? moment(birthInput.value).format() : birth; 
            const userForRequest: User = {
                ...user,
                firstName: firstNameInput.value || firstName,
                lastName: lastNameInput.value || lastName,
                birth: newBirth
            }
            Spinner.showSpinner();
            await apiService.put(`users/${userId}`, userForRequest)
                .then(() => {
                    setUserLocal(userForRequest);
                    firstNameInput.value = userForRequest.firstName;
                    lastNameInput.value = userForRequest.lastName;

                    editBtn.innerText = 'Edit';
                    cancelBtn.classList.add('hidden');
                });
        }
    }
   

    photoInput.oninput = (event: Event): void => {
        const file: File = (event.target as HTMLInputElement).files[0];
        const fileName: string = `${uuidv4()}_${(event.target as HTMLInputElement).files[0].name}`
        const storageRef: StorageReference = ref(storage, 'photo/' + fileName);
        const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);

        if (!FILE_EXTENSIONS.includes(file.type)) {
            showNotification(ERROR_MESSAGES.get('wrong_file_type'));
        } else if (file.size >= 5000000) {
            showNotification(ERROR_MESSAGES.get('wrong_file_size'));
        } else {
            Spinner.showSpinner();
            uploadTask.on(
                'state_changed',
                (snapshot: UploadTaskSnapshot): void => {
                    const progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
                    console.log('Upload is ' + progress + '% done');
                }, 
                (): void => {},
                 async (): Promise<void> => {
                    let photo: string = '';

                    delete user.userId;
                    console.log('start');
    
                    await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
                        console.log('File available at', downloadURL);
                        photo = downloadURL;
                    }).catch(() => Spinner.hideSpinner());
                    await apiService.put(`users/${userId}`, {...user, photo})
                        .then((res: Response) => {
                            console.log('ok', res);
                            image.remove();
                            image.setAttribute('src', photo);
                            profilePhoto.append(image);
                            setUserLocal({...user, photo});
                            Header.refreshAvatar();
                            console.log('done');

                        });
                }
            );
        }
    }
    
    Header.getHeader(body);
}
