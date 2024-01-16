import YouTubeEmbed from 'react-youtube'

const YouTubeVid= (props) => {
    const { attributes,children,element} = props
    const {youtubeId} = element

    return (
        <div {...attributes}>
            <div contentEditabl={false}>
        <YouTubeEmbed
            videoId={youtubeId}
        />
    </div>
    {children}
    </div>
    )
}
export default YouTubeVid