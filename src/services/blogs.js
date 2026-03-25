import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from './firebase';
import { blogs as staticBlogs } from '../data/blogs';
import { getBlogDateValue } from '../utils/formatBlogDate';

function sortBlogs(posts) {
    return [...posts].sort(
        (a, b) => getBlogDateValue(b.date ?? b.createdAt) - getBlogDateValue(a.date ?? a.createdAt)
    );
}

export async function fetchBlogs() {
    try {
        const q = query(collection(db, 'blogs'));
        const querySnapshot = await getDocs(q);

        const fetchedPosts = [];
        querySnapshot.forEach((blogDoc) => {
            fetchedPosts.push({ id: blogDoc.id, ...blogDoc.data() });
        });

        if (fetchedPosts.length > 0) {
            return sortBlogs(fetchedPosts);
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
    }

    return sortBlogs(staticBlogs);
}

export async function fetchBlogById(id) {
    const staticPost = staticBlogs.find((blog) => blog.id === id);
    if (staticPost) {
        return staticPost;
    }

    try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
    } catch (error) {
        console.error('Error fetching post:', error);
    }

    return null;
}
