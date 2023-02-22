import React, { useContext, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import classNames from "classnames";
import configs from "../../utils/configs";
import { CreateRoomButton } from "./CreateRoomButton";
import { PWAButton } from "./PWAButton";
import { useFavoriteRooms } from "./useFavoriteRooms";
import { usePublicRooms } from "./usePublicRooms";
import styles from "./HomePage.scss";
import { AuthContext } from "../auth/AuthContext";
import { createAndRedirectToNewHub } from "../../utils/phoenix-utils";
import { MediaGrid } from "../room/MediaGrid";
import { MediaTile } from "../room/MediaTiles";
import { PageContainer } from "../layout/PageContainer";
import { scaledThumbnailUrlFor } from "../../utils/media-url-utils";
import { Column } from "../layout/Column";
import { Container } from "../layout/Container";
import { SocialBar } from "../home/SocialBar";
import { SignInButton } from "./SignInButton";
import { AppLogo } from "../misc/AppLogo";
import { isHmc } from "../../utils/isHmc";
import maskEmail from "../../utils/mask-email";

export function HomePage() {
  const auth = useContext(AuthContext);
  const intl = useIntl();
  const myHTML = `<section class="Container__container__wjKkZ HomePage__rooms-container__A9sZf">
  <h3 class="HomePage__rooms-heading__sOYNb">Public Rooms</h3>
  <div
      class="Column__column__ZuRI0 Column__md-gap__YLriB Column__lg-padding__SlnQw Column__grow__DxOwX Column__margin-0-last-child__aJIlP HomePage__rooms__Hp7ve">
      <div class="MediaGrid__media-grid__CTSyf MediaGrid__center__sJRuA">
          <div class="MediaTiles__media-tile__E0HUl MediaTiles__wide__dHsYw" tabindex="0" role="button">
              <div class="MediaTiles__thumbnail-container__MKVU6"><a
                      class="MediaTiles__thumbnail-link__gdkAW"
                      href="https://aumentur.net/hXMJPhe/crucero-del-hospital-real"
                      rel="noreferrer noopener"><img
                          src="https://aumentur-1-nearspark.aumentur.net/thumbnail/aHR0cHM6Ly9hdW1lbnR1ci0xLWFzc2V0cy5hdW1lbnR1ci5uZXQvZmlsZXMvMDMwMzBhYzQtNjI3Yi00MmQyLWExMDMtNDBhMzExZTE0MzM0LmpwZw.jpg?w=391&amp;h=220"
                          alt="Crucero del Hospital Real" width="391" height="220"></a>
                  <div class="MediaTiles__member-count__vcGmo"><svg width="20" height="20"
                          viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M15.703 6.563c-.114 1.588-1.293 2.812-2.578 2.812s-2.466-1.223-2.578-2.812c-.117-1.653 1.03-2.813 2.578-2.813 1.548 0 2.695 1.19 2.578 2.813Z"
                              stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round"></path>
                          <path
                              d="M13.125 11.875c-2.546 0-4.994 1.264-5.607 3.727-.081.326.123.648.458.648h10.299c.335 0 .538-.322.458-.648-.614-2.502-3.062-3.727-5.608-3.727Z"
                              stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"></path>
                          <path
                              d="M7.812 7.264C7.721 8.532 6.77 9.53 5.742 9.53c-1.026 0-1.98-.998-2.07-2.267C3.578 5.944 4.505 5 5.742 5c1.237 0 2.164.968 2.07 2.264Z"
                              stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round"></path>
                          <path
                              d="M8.047 11.954c-.705-.324-1.482-.448-2.305-.448-2.031 0-3.988 1.01-4.478 2.977-.065.26.098.517.366.517h4.386"
                              stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"
                              stroke-linecap="round"></path>
                      </svg> <span>0</span></div>
                  <div class="MediaTiles__tile-actions__7omsl"></div>
              </div>
              <div class="MediaTiles__info__A_JN6"><b>Crucero del Hospital Real</b><small
                      class="MediaTiles__description____teU"></small></div>
          </div>
      </div>
  </div>
</section>`;
  const Salas = () => <div dangerouslySetInnerHTML={{ __html: myHTML }} />;

  const { results: favoriteRooms } = useFavoriteRooms();
  const { results: publicRooms } = usePublicRooms();

  const sortedFavoriteRooms = Array.from(favoriteRooms).sort((a, b) => b.member_count - a.member_count);
  const sortedPublicRooms = Array.from(publicRooms).sort((a, b) => b.member_count - a.member_count);
  const wrapInBold = chunk => <b>{chunk}</b>;
  useEffect(() => {
    const qs = new URLSearchParams(location.search);

    // Support legacy sign in urls.
    if (qs.has("sign_in")) {
      const redirectUrl = new URL("/signin", window.location);
      redirectUrl.search = location.search;
      window.location = redirectUrl;
    } else if (qs.has("auth_topic")) {
      const redirectUrl = new URL("/verify", window.location);
      redirectUrl.search = location.search;
      window.location = redirectUrl;
    }

    if (qs.has("new")) {
      createAndRedirectToNewHub(null, null, true);
    }
  }, []);

  const canCreateRooms = !configs.feature("disable_room_creation") || auth.isAdmin;
  const email = auth.email;
  const isMobile = auth.isAdmin;
 /* if (!isMobile) {
    return (
      <PageContainer className={styles.homePage}>
        <Container>
          <div className={styles.hero}>
            <div className={styles.appInfo}>
              <div className={styles.noEnter}>Este contenido sólo está disponible desde un dispositivo de Realidad Virtual</div>
              {canCreateRooms && <CreateRoomButton />}
              <PWAButton />
            </div>
            
          </div>
        </Container>
        

        <Column center>
          <SocialBar />
        </Column>

      </PageContainer>
    );
  }
  else {*/
    return (
      <PageContainer className={styles.homePage}>
        <Container>
          <div className={styles.hero}>
            {/*      {auth.isSignedIn ? (
            <div className={styles.signInContainer}>
              <span>
                <FormattedMessage
                  id="header.signed-in-as"
                  defaultMessage="Signed in as {email}"
                  values={{ email: maskEmail(email) }}
                />
              </span>
              <a href="#" onClick={auth.signOut} className={styles.mobileSignOut}>
                <FormattedMessage id="header.sign-out" defaultMessage="Sign Out" />
              </a>
            </div>
          ) : (
            <SignInButton mobile />
          )} 
          <div className={styles.logoContainer}>
            <AppLogo />
          </div>*/}
            <div className={styles.appInfo}>
              <div className={styles.appDescription}>{configs.translation("app-description")}</div>
              {canCreateRooms && <CreateRoomButton />}
              <PWAButton />
            </div>
            <div className={styles.heroImageContainer}>
              <img
                alt={intl.formatMessage(
                  {
                    id: "home-page.hero-image-alt",
                    defaultMessage: "Screenshot of {appName}"
                  },
                  { appName: configs.translation("app-name") }
                )}
                src={configs.image("home_background")}
              />
            </div>
          </div>
        </Container>
        {/*configs.feature("show_feature_panels") && ( */}
        <Container className={classNames(styles.features, styles.colLg, styles.centerLg)}>
          <Column padding gap="xl" className={styles.card}>
            <img src={configs.image("landing_rooms_thumb")} />
            <h3>
              <FormattedMessage id="home-page.rooms-title" defaultMessage="Instantly create rooms" />
            </h3>
            <p>
              <FormattedMessage
                id="home-page.rooms-blurb"
                defaultMessage="Share virtual spaces with your friends, co-workers, and communities. When you create a room with Hubs, you’ll have a private virtual meeting space that you can instantly share <b>- no downloads or VR headset necessary.</b>"
                values={{ b: wrapInBold }}
              />
            </p>
          </Column>
          <Column padding gap="xl" className={styles.card}>
            <img src={configs.image("landing_communicate_thumb")} />
            <h3>
              <FormattedMessage id="home-page.communicate-title" defaultMessage="Communicate and Collaborate" />
            </h3>
            <p>
              <FormattedMessage
                id="home-page.communicate-blurb"
                defaultMessage="Choose an avatar to represent you, put on your headphones, and jump right in. Hubs makes it easy to stay connected with voice and text chat to other people in your private room."
              />
            </p>
          </Column>
          <Column padding gap="xl" className={styles.card}>
            <img src={configs.image("landing_media_thumb")} />
            <h3>
              <FormattedMessage id="home-page.media-title" defaultMessage="An easier way to share media" />
            </h3>
            <p>
              <FormattedMessage
                id="home-page.media-blurb"
                defaultMessage="Share content with others in your room by dragging and dropping photos, videos, PDF files, links, and 3D models into your space."
              />
            </p>
          </Column>
        </Container>
        {/*sortedPublicRooms.length > 0 && (
        <Container className={styles.roomsContainer}>
          <h3 className={styles.roomsHeading}>
            <FormattedMessage id="home-page.public--rooms" defaultMessage="Public Rooms" />
          </h3>
          <Column grow padding className={styles.rooms}>
            <MediaGrid center>
              {sortedPublicRooms.map(room => {
                return (
                  <MediaTile
                    key={room.id}
                    entry={room}
                    processThumbnailUrl={(entry, width, height) =>
                      scaledThumbnailUrlFor(entry.images.preview.url, width, height)
                    }
                  />
                );
              })}
            </MediaGrid>
          </Column>
        </Container>
            )*/}
        {Salas()}
        {sortedFavoriteRooms.length > 0 && (
          <Container className={styles.roomsContainer}>
            <h3 className={styles.roomsHeading}>
              <FormattedMessage id="home-page.favorite-rooms" defaultMessage="Favorite Rooms" />
            </h3>
            <Column grow padding className={styles.rooms}>
              <MediaGrid center>
                {sortedFavoriteRooms.map(room => {
                  return (
                    <MediaTile
                      key={room.id}
                      entry={room}
                      processThumbnailUrl={(entry, width, height) =>
                        scaledThumbnailUrlFor(entry.images.preview.url, width, height)
                      }
                    />
                  );
                })}
              </MediaGrid>
            </Column>
          </Container>
        )}

        <Column center>
          <SocialBar />
        </Column>

      </PageContainer>
    );
 // }
}
