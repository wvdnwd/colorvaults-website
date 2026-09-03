import { ImageResponse } from'next/og';

export const runtime ='edge';

const ALLOWED_HOSTNAMES = new Set(['colorvaults.ams3.cdn.digitaloceanspaces.com','colorvaults.ams3.digitaloceanspaces.com']);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let title = searchParams.get('title') ||'Free Coloring Pages';
    if (title.length > 200) {
      title = title.substring(0, 200);
    }
    const image = searchParams.get('image'); // e.g. URL to space

    // Validate if'image'is an absolute URL
    let absoluteImageUrl = null;
    if (image) {
      if (image.startsWith('http')) {
        try {
          const parsedImage = new URL(image);
          if (ALLOWED_HOSTNAMES.has(parsedImage.hostname)) {
            absoluteImageUrl = image;
          }
        } catch (e) {
          // Keep absoluteImageUrl = null
        }
      } else {
        absoluteImageUrl =`https://colorvaults.com${image}`;
      }
    }

    return new ImageResponse(
      (
        <div
          style={{
            height:'100%',
            width:'100%',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#7c3aed',
            background:'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
            padding:'40px',
            position:'relative',
          }}
        >
          {/* Background pattern */}
          <div
            style={{
              position:'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage:'radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)',
              backgroundSize:'100px 100px',
            }}
          />
          
          {absoluteImageUrl && (
            <img
              src={absoluteImageUrl}
              alt={title}
              style={{
                width:'400px',
                height:'400px',
                objectFit:'cover',
                borderRadius:'24px',
                boxShadow:'0 20px 40px rgba(0,0,0,0.3)',
                marginBottom:'40px',
                border:'8px solid white',
              }}
            />
          )}

          <div
            style={{
              display:'flex',
              flexDirection:'column',
              alignItems:'center',
              textAlign:'center',
            }}
          >
            <h1
              style={{
                fontSize:'64px',
                fontWeight: 900,
                color:'white',
                marginBottom:'10px',
                fontFamily:'sans-serif',
                textShadow:'0 4px 10px rgba(0,0,0,0.2)',
                lineHeight: 1.1,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize:'32px',
                color:'rgba(255, 255, 255, 0.9)',
                fontWeight: 600,
                marginTop:'10px',
              }}
            >
              ColorVaults.com
            </p>
          </div>
          
          <div
            style={{
              position:'absolute',
              top:'40px',
              right:'40px',
              background:'white',
              color:'#7c3aed',
              padding:'10px 20px',
              borderRadius:'100px',
              fontSize:'24px',
              fontWeight: 800,
              boxShadow:'0 4px 10px rgba(0,0,0,0.1)',
            }}
          >
            100% FREE
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
