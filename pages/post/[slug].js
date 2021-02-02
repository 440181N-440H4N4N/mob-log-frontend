import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'
import { useState, useEffect } from 'react'
import styles from '../../styles/Post.module.css'
import { Toolbar } from '../../components/Toolbar'

export const Post = ({ title, body, image }) => {
    //console.log(title, body, image);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const imgBuilder = imageUrlBuilder({
            projectId: 'h87fwbwq',
            dataset: 'production'
        })

        setImageUrl(imgBuilder.image(image));
    }, [image])

    return (
        <div>
            <Toolbar />
            <div className={styles.main}>
                <h1>{title}</h1>
                {imageUrl && <img className={styles.mainImage} src={imageUrl} />}
                <div className={styles.body}>
                    <BlockContent blocks={body} />
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async pageContext => {
    const pageSlug = pageContext.query.slug;
    //console.log(pageSlug);

    if (!pageSlug) {
        return {
            notfound: true
        }
    }

    const query = encodeURIComponent(`*[ _type == "post" && slug.current == "${pageSlug}" ]`);
    const url = `https://h87fwbwq.api.sanity.io/v1/data/query/production?query=${query}`;

    const result = await fetch(url).then(res => res.json());
    const post = result.result[0];

    if (!post) {
        return {
            notfound: true
        }
    } else {
        return {
            props: {
                body: post.body,
                title: post.title,
                image: post.mainImage
            }
        }
    }
}

export default Post;