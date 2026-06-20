type LoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

function getCloudinaryCloudName(): string {
  return process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim() || 'doeoxmyna';
}

export default function cloudinaryLoader({ src, width }: LoaderProps): string {
  if (
    src.startsWith('https://') ||
    src.startsWith('http://') ||
    src.startsWith('data:')
  ) {
    return src;
  }

  // Same-origin static files from /public (do not send through Cloudinary)
  if (src.startsWith('/')) {
    return src;
  }

  const params = ['f_auto', 'q_auto:best', 'dpr_auto', 'c_limit', `w_${width}`];
  const cloudName = getCloudinaryCloudName();

  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(',')}/${src}`;
}
