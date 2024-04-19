<template>
    <q-card class="q-mb-md"
        style="max-width: 500px; min-width: 990px; margin-bottom: 0px; margin-top: 70px; margin-left: 15px;">
        <q-card-section>
            <div class="flex items-center">
                <q-btn flat icon="arrow_back" size="11px" class="back-button" @click="goBack" />
                <span class="page-title">Retail Stores <span class="greater-than-icon">></span> <span
                        class="add-store">Add Store</span></span>
            </div>
            <q-card-main>

                <form @submit.prevent="submitForm">
                    <div class="fit row wrap justify-start items-start content-start">
                        <div class="title">Contact</div>
                        <hr class="section-divider-left" />
                        <div style="margin-left: 10px;">
                            <div class="form-group">
                                <label for="storeName">Store Name<span class="required">*</span></label>
                                <q-input outlined v-model="storeName" id="storeName" required dense
                                    style="width: 300px; height: 43px; border: 2px solid #dd9c11; border-radius: 6px; margin-bottom: 15px" />
                            </div>
                            <div class="form-group">
                                <label for="email">Email Address<span class="required">*</span></label>
                                <q-input outlined v-model="email" id="email" type="email" required dense
                                    style="width: 300px; height: 43px; border: 2px solid #dd9c11; border-radius: 6px; margin-bottom: 15px" />
                            </div>
                            <div class="form-group">
                                <label for="phoneNumber">Phone Number<span class="required">*</span></label>
                                <q-input outlined v-model="phoneNumber" id="phoneNumber" type="tel" required dense
                                    style="width: 300px; height: 43px; border: 2px solid #dd9c11; border-radius: 6px; margin-bottom: 15px" />
                            </div>
                        </div>
                        <div style="margin-left: 50px;">
                            <div class="fit column wrap justify-start items-start content-start">
                                <label for="storeImage">Store Image (Optional)</label>
                                <label class="drop-zone" for="storeImageInput" @drop="handleDrop" @dragover.prevent>
                                    <img v-if="storeImagePreview" :src="storeImagePreview"
                                        style="max-width: 100%; max-height: 100%;" />
                                    <span v-else>Drop image here or click to upload</span>
                                    <input type="file" id="storeImageInput" @change="onFileChange" accept="image/*"
                                        style="display: none;" />
                                </label>
                            </div>
                        </div>


                    </div>

                    <div class="fit row wrap justify-start items-start content-start">
                        <div class="title">Address</div>
                        <hr class="section-divider-left" />

                        <div style="margin-left: 10px;">
                            <div class="form-group">
                                <label for="province">Province<span class="required">*</span></label>
                                <q-select outlined v-model="province" id="province" :options="provinces" required dense
                                    style="width: 300px; height: 43px; border: 2px solid #dd9c11; border-radius: 6px; margin-bottom: 15px" />
                            </div>
                            <div class="form-group">
                                <label for="city">City/Municipality<span class="required">*</span></label>
                                <q-select outlined v-model="city" id="city" :options="cities" required dense
                                    style="width: 300px; height: 43px; border: 2px solid #dd9c11; border-radius: 6px; margin-bottom: 15px" />
                            </div>
                            <div class="form-group">
                                <label for="barangay">Barangay<span class="required">*</span></label>
                                <q-select outlined v-model="barangay" id="barangay" :options="barangays" required dense
                                    style="width: 300px; height: 43px; border: 2px solid #dd9c11; border-radius: 6px; margin-bottom: 15px" />
                            </div>
                            <div class="form-group">
                                <label for="streetBuilding">Street/Building (Optional)</label>
                                <q-input outlined v-model="streetBuilding" id="streetBuilding" dense
                                    style="width: 300px; height: 43px; border: 2px solid #dd9c11; border-radius: 6px; margin-bottom: 15px" />
                            </div>
                            <div class="form-group">
                                <label for="postalCode">Postal Code (Optional)</label>
                                <q-input outlined v-model="postalCode" id="postalCode" dense
                                    style="width: 300px; height: 43px; border: 2px solid #dd9c11; border-radius: 6px; margin-bottom: 15px" />
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 10px; margin-left: 800px;">
                        <q-btn type="submit" unelevated rounded color="primary" label="Add Store"
                            style="width: 95px; font-size: 11px;" />
                    </div>
                </form>
            </q-card-main>
        </q-card-section>
    </q-card>
</template>

<script setup>
import { ref } from 'vue';

const storeName = ref('');
const email = ref('');
const phoneNumber = ref('');
const storeImage = ref(null);
const storeImagePreview = ref(null);
const province = ref('');
const city = ref('');
const barangay = ref('');
const streetBuilding = ref('');
const postalCode = ref('');
const provinces = ref(['Province 1', 'Province 2', 'Province 3']);
const cities = ref(['City 1', 'City 2', 'City 3']);
const barangays = ref(['Barangay 1', 'Barangay 2', 'Barangay 3']);

const submitForm = () => {
    const formData = {
        storeName: storeName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        storeImage: storeImage.value ? URL.createObjectURL(storeImage.value) : null,
        province: province.value,
        city: city.value,
        barangay: barangay.value,
        streetBuilding: streetBuilding.value,
        postalCode: postalCode.value,
    };
    localStorage.setItem('storeData', JSON.stringify(formData));
};

const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        storeImage.value = file;
        const reader = new FileReader();
        reader.onload = () => {
            storeImagePreview.value = reader.result;
        };
        reader.readAsDataURL(file);
    } else {
        storeImage.value = null;
        storeImagePreview.value = null;
    }
};

function goBack() {
    window.location.reload();
}

function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
        storeImage.value = file;
        const reader = new FileReader();
        reader.onload = () => {
            storeImagePreview.value = reader.result;
        };
        reader.readAsDataURL(file);
    }
}
</script>

<style scoped>
.page-title {
    color: #999;
    font-weight: bold;
    font-size: 18px;
}

.greater-than-icon {
    margin: 0 5px;
}

.add-store {
    color: #9d7204;
}

.back-button {
    margin-left: -20px;
    margin-right: -8px;
}

.label {
    flex: 0 0 150px;
    margin-bottom: 20px;
    margin-left: 10px;
}

.section-divider-left {
    margin-top: 5px;
    border: none;
    border-top: 1px solid #000000;
    width: calc(100% + 100px);
    margin-left: 10px;

}

.title {
    color: #9d7204;
    font-weight: 400;
    font-size: 18px;
    margin-top: 40px;
    margin-left: 10px;
}

.drop-zone {
    width: 300px;
    height: 100px;
    border: 2px dashed #dd9c11;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-top: 10px;
    border-radius: 10px;
}
</style>
