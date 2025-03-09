import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';  // import ฟังก์ชันจาก Firebase

// เลือกไฟล์จาก input
const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    // สร้าง reference สำหรับการอัปโหลดไฟล์ไปยัง Firebase Storage
    const storage = getStorage();  // เรียกใช้ storage จาก Firebase
    const storageRef = ref(storage, `car/${file.name}`);  // กำหนด path ที่ต้องการเก็บไฟล์

    // อัปโหลดไฟล์แบบ Resumable (สามารถติดตามสถานะได้)
    const uploadTask = uploadBytesResumable(storageRef, file);

    // การติดตามสถานะการอัปโหลด
    uploadTask.on('state_changed', 
      (snapshot) => {
        // คำนวณเปอร์เซ็นต์การอัปโหลด
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      }, 
      (error) => {
        // ถ้ามีข้อผิดพลาดเกิดขึ้น
        console.error("Error uploading file:", error);
      }, 
      () => {
        // เมื่ออัปโหลดเสร็จสิ้น
        console.log('Upload complete');
      }
    );
  }
});
