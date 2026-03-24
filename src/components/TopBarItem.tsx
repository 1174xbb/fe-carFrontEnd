import Link from "next/link"
import styles from "./TopBarItem.module.css"

type TopBarItemProps = {
    url: string
    name: string
}

export default function TopBarItem({ url, name }: TopBarItemProps) {
    return (
        <div className={styles.TopBar}>
            <Link href={url}>{name}</Link>
        </div>
    )
}