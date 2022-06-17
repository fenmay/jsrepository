import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {v4 as uuidv4} from 'uuid';
import * as moment from 'moment';

import { Header } from "../header/header";
import { apiService } from '../../api/api-handlers';
import { getUserLocal, setUserLocal } from '../../shared/services/local-storage-service';
import { FILE_EXTENSIONS } from '../../shared/constants/file-extensions';
import { showNotification } from '../../shared/notifications';
import { ERROR_MESSAGES } from '../../shared/validators';
import { Spinner } from '../../shared/spinner';

export const profileHandler = () => {
    const storage = getStorage();
    const user = getUserLocal();
    const {firstName, lastName, birth, photo, userId} = user;
    const body = document.getElementsByTagName('body')[0];
    const photoInput = document.getElementById('photo');
    const profilePhoto = document.querySelector('.profile__photo');
    const image = document.createElement('img');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const birthInput = document.getElementById('birth');
    const editBtn = document.getElementById('editBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    let isEditInProgress = false;

    firstNameInput.value = firstName;
    lastNameInput.value = lastName;
    birthInput.value = moment(birth).format('YYYY-MM-DD');

    image.setAttribute('src', photo || 'src/assets/img/no-avatar.png');
    profilePhoto.append(image);

    editBtn.onclick = async () => {
        const formControls = document.querySelectorAll('.form-control');


        isEditInProgress = !isEditInProgress;
        formControls.forEach(control => 
            isEditInProgress ? control.removeAttribute('disabled') : control.setAttribute('disabled', 'true'));

        if (isEditInProgress) {
            cancelBtn.classList.remove('hidden');
            editBtn.innerText = 'Save';


        } else {
            const newBirth = moment(birthInput.value).isValid() ? moment(birthInput.value).format() : birth; 
            const userForRequest = {
                ...user,
                firstName: firstNameInput.value || firstName,
                lastName: lastNameInput.value || lastName,
                birth: newBirth
            }
            Spinner.showSpinner();
            await apiService.put(`users/${userId}`, userForRequest)
                .then(response => {
                    setUserLocal(userForRequest);
                    firstNameInput.value = userForRequest.firstName;
                    lastNameInput.value = userForRequest.lastName;

                    editBtn.innerText = 'Edit';
                    cancelBtn.classList.add('hidden');
                });
        }
    }
   

    photoInput.oninput = event => {
        const file = event.target.files[0];
        const fileName = `${uuidv4()}_${event.target.files[0].name}`
        const storageRef = ref(storage, 'photo/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        if (!FILE_EXTENSIONS.includes(file.type)) {
            showNotification(ERROR_MESSAGES.get('wrong_file_type'));
        } else if (file.size >= 5000000) {
            showNotification(ERROR_MESSAGES.get('wrong_file_size'));
        } else {
            Spinner.showSpinner();
            uploadTask.on(
                'state_changed',
                snapshot => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
                    console.log('Upload is ' + progress + '% done');
                }, 
                () => {},
                 async () => {
                    let photo = '';

                    delete user.userId;
                    console.log('start');
    
                    await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        photo = downloadURL;
                    }).catch(err => Spinner.hideSpinner());
                    await apiService.put(`users/${userId}`, {...user, photo})
                        .then(res => {
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
