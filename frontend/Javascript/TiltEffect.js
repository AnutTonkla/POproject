"use strict";
/**
 * ส่วนที่ 1: TiltEffect Class
 * ทำหน้าที่จัดการเอฟเฟกต์การ์ดเอียง 3D ตามการเคลื่อนที่ของเมาส์
 */
class TiltEffect {
    elements;
    maxRotate = 8; // องศาการเอียงสูงสุด
    constructor(selector) {
        this.elements = document.querySelectorAll(selector);
        this.init();
    }
    init() {
        this.elements.forEach(element => {
            // ตั้งค่าพื้นฐานสำหรับ 3D
            element.style.transition = "transform 0.1s ease-out, box-shadow 0.1s ease-out";
            element.style.transformStyle = "preserve-3d";
            if (element.parentElement) {
                element.parentElement.style.perspective = "1000px";
            }
            // ดักจับเหตุการณ์เมาส์
            element.addEventListener('mousemove', (e) => this.handleMouseMove(e, element));
            element.addEventListener('mouseleave', () => this.handleMouseLeave(element));
        });
    }
    handleMouseMove(e, el) {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // คำนวณตำแหน่งเมาส์เป็นเปอร์เซ็นต์ (-1 ถึง 1)
        const percentX = (e.clientX - centerX) / (rect.width / 2);
        const percentY = (e.clientY - centerY) / (rect.height / 2);
        const rotateY = percentX * this.maxRotate;
        const rotateX = -percentY * this.maxRotate;
        // สั่งหมุนและขยายขนาดเล็กน้อย
        el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }
    handleMouseLeave(el) {
        // คืนค่ากลับเป็นปกติเมื่อเมาส์ออก
        el.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
}
/**
 * ส่วนที่ 2: การเริ่มต้นทำงาน (Execution)
 * ทำงานเมื่อโหลดหน้าเว็บเสร็จสมบูรณ์
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- 2.1 เรียกใช้งานเอฟเฟกต์การ์ดเอียง ---
    // ตรวจสอบก่อนว่ามีการสร้าง Class TiltEffect ไว้จริงไหมเพื่อกัน Error
    if (typeof TiltEffect !== 'undefined') {
        new TiltEffect('.card'); // ระบุ Class ของการ์ดที่ต้องการให้เอียง
    }
    // --- 2.2 จัดการการหดตัวของ Hero Wrapper เมื่อ Scroll ---
    const wrapper = document.querySelector('.hero-wrapper');
    if (wrapper) {
        window.addEventListener('scroll', () => {
            // ถ้าเลื่อนหน้าจอลงมามากกว่า 50px ให้เติม Class 'scrolled'
            if (window.scrollY > 50) {
                wrapper.classList.add('scrolled');
            }
            else {
                // ถ้ากลับไปด้านบนสุด ให้เอา Class ออกเพื่อกลับมาอยู่กลางจอ
                wrapper.classList.remove('scrolled');
            }
        });
    }
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    // ตรวจสอบธีมเดิมที่เคยบันทึกไว้
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
    }
    // ใช้เครื่องหมาย ? เพื่อป้องกันบัค 'possibly null' ใน TypeScript
    toggleBtn?.addEventListener('click', () => {
        // คำสั่งสลับ Class 'light-mode' เพื่อให้ CSS Variables เปลี่ยนค่า
        body.classList.toggle('light-mode');
        // บันทึกสถานะไว้ในเครื่องผู้ใช้
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        }
        else {
            localStorage.setItem('theme', 'dark');
        }
    });
});
