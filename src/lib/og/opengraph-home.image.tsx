import { ImageResponse } from 'next/og';

import {
  openGraphHomeBrandStyle,
  openGraphHomeHeadlineStyle,
  openGraphHomeImageSize,
  openGraphHomeRootStyle,
  openGraphHomeSubheadStyle,
} from '@/lib/og/opengraph-home.styles';
import { brandName } from '@/lib/constants/seo';

export default function OpenGraphHomeImage() {
  return new ImageResponse(
    <div style={openGraphHomeRootStyle}>
      <div style={openGraphHomeBrandStyle}>{brandName}</div>
      <div style={openGraphHomeHeadlineStyle}>
        Healthcare made accessible, secure, and connected
      </div>
      <div style={openGraphHomeSubheadStyle}>
        Book consultations, connect with verified professionals, and manage health records
        online.
      </div>
    </div>,
    { ...openGraphHomeImageSize },
  );
}
