import YouTubeEmbed from 'react'

const YouTubeVid= (props) => {
    const { attributes,children,element} = props
    const {youtubeId} = element

    return (
        <div {...attributes}>
            <div contentEditabl={false}>
        <YouTubeEmbed
            contentEditable={false}
            videoId={youtubeId}
        />
        {children}
    </div>
    </div>
    )
}
export default YouTubeVid