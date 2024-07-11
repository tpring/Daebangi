// 모달 창을 띄우기 위한 layout

export default function Layout({
    children,
    modal,
}: {
    children: React.ReactNode
    modal: React.ReactNode
}) {
    return (
        <>
            {children}
            {modal}
        </>
    )
}

