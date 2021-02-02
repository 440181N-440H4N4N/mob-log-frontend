import { useRouter } from 'next/router'
import styles from '../styles/Toolbar.module.css'

export const Toolbar = () => {
    const router = useRouter();
    return (
        <div className={styles.main}>
            <div onClick={() => router.push('/')}>Home</div>
            <div onClick={() => window.location.href = 'https://twitter.com/the_demystifier'}>Twitter</div>
            <div onClick={() => window.location.href = 'https://github.com/440181N-440H4N4N'}>GitHub</div>
        </div>
    );
}

// export default Toolbar