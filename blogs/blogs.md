#### **1\. نظرة عامة على المشروع**

مشروع backend لإدارة نظام مقالات متكامل يشمل إدارة المقالات، التصنيفات، الوسوم، والإعلانات، مع تحسين محركات البحث (SEO) ودعم البحث والفلاتر. الهدف هو توفير نظام مرن وقابل للتوسع لإدارة المحتوى.

---

#### **2\. الموديولات الأساسية**

##### **أ. موديول المقالات (Articles Module)**

* **الخصائص الأساسية:**  
  * `title`: عنوان المقالة.  
  * `content`: محتوى المقالة.  
  * `featuredImage`: رابط الصورة الرئيسية.  
  * **إعدادات تحسين محركات البحث (SEO):**  
    * `metaTitle`: العنوان لتحسين محركات البحث.  
    * `metaDescription`: الوصف لتحسين محركات البحث.  
    * `slug`: الرابط المخصص.  
    * `keywords`: الكلمات المفتاحية.  
  * `categories`: التصنيفات المرتبطة بالمقالة.  
  * `tags`: الوسوم المرتبطة بالمقالة.  
  * `status`: حالة المقالة (مسودة/منشور/أرشيف).  
  * `publishedAt`: تاريخ النشر.  
  * `updatedAt`: تاريخ التعديل.  
  * `views`: عدد المشاهدات (لتصنيف المقالات حسب الأكثر مشاهدة).

---

##### **ب. موديول التصنيفات (Categories Module)**

* **الخصائص:**  
  * `name`: اسم التصنيف.  
  * `description`: وصف التصنيف.  
  * `slug`: الرابط المخصص.  
  * `image`: رابط صورة التصنيف.

---

##### **ج. موديول الوسوم (Tags Module)**

* **الخصائص:**  
  * `name`: اسم الوسم.  
  * `slug`: الرابط المخصص.  
  * `articles`: قائمة المقالات المرتبطة بهذا الوسم.

---

##### **د. موديول الإعلانات (Advertisements Module)**

* **الخصائص:**  
  * `position`: موقع الإعلان داخل الصفحة (أعلى/منتصف/جوانب).  
  * `content`: محتوى الإعلان (نص/صورة/HTML).  
  * `startDate`: تاريخ بدء العرض.  
  * `endDate`: تاريخ انتهاء العرض.  
  * `isActive`: حالة الإعلان (فعال/غير فعال).

---

#### **3\. المزايا الإضافية للنظام**

##### **أ. نظام البحث والفلاتر**

* **خصائص البحث:**  
  * `query`: النص المُدخل للبحث.  
  * البحث في (العنوان/المحتوى/الوسوم/التصنيفات).  
* **خصائص الفلاتر:**  
  * `category`: فلترة حسب التصنيف.  
  * `tags`: فلترة حسب الوسوم.  
  * `status`: فلترة حسب الحالة.  
  * `dateRange`: فلترة حسب نطاق زمني.  
  * `sortBy`: ترتيب النتائج (الأحدث/الأكثر مشاهدة).

---

##### **ب. إدارة المستخدمين والصلاحيات**

* إضافة نظام مستخدمين بسيط لدعم:  
  * مشرفين (Admins): لديهم كافة الصلاحيات.  
  * محررين (Editors): يمكنهم إضافة وتعديل المقالات فقط.  
* **الخصائص:**  
  * `username`: اسم المستخدم.  
  * `password`: كلمة المرور (مع تشفير).  
  * `role`: دور المستخدم (Admin/Editor).  
  * `lastLogin`: تاريخ آخر تسجيل دخول.

---

##### **ج. إعدادات النظام**

* **الخصائص:**  
  * `siteName`: اسم الموقع.  
  * `logo`: شعار الموقع.  
  * `defaultSEO`: إعدادات SEO الافتراضية (العنوان، الوصف، الكلمات المفتاحية).

---

#### **4\. الهيكلية العامة لقاعدة البيانات (Database Schema)**

##### **Article Schema**

javascript  
Copy code  
`{`  
  `title: String,`  
  `content: String,`  
  `featuredImage: String,`  
  `metaTitle: String,`  
  `metaDescription: String,`  
  `slug: String,`  
  `keywords: [String],`  
  `categories: [ObjectId], // References Category`  
  `tags: [ObjectId], // References Tag`  
  `status: { type: String, enum: ['Draft', 'Published', 'Archived'] },`  
  `publishedAt: Date,`  
  `updatedAt: Date,`  
  `views: Number,`  
`}`

##### **Category Schema**

javascript  
Copy code  
`{`  
  `name: String,`  
  `description: String,`  
  `slug: String,`  
  `image: String,`  
`}`

##### **Tag Schema**

javascript  
Copy code  
`{`  
  `name: String,`  
  `slug: String,`  
  `articles: [ObjectId], // References Article`  
`}`

##### **Advertisement Schema**

javascript  
Copy code  
`{`  
  `position: { type: String, enum: ['Top', 'Middle', 'Side'] },`  
  `content: String,`  
  `startDate: Date,`  
  `endDate: Date,`  
  `isActive: Boolean,`  
`}`

##### **User Schema**

javascript  
Copy code  
`{`  
  `username: String,`  
  `password: String,`  
  `role: { type: String, enum: ['Admin', 'Editor'] },`  
  `lastLogin: Date,`  
`}`

##### **System Settings Schema**

javascript  
Copy code  
`{`  
  `siteName: String,`  
  `logo: String,`  
  `defaultSEO: {`  
    `metaTitle: String,`  
    `metaDescription: String,`  
    `keywords: [String],`  
  `},`  
`}`

