import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Header from '../../components/header/header';
import PropertyReviewForm from '../../components/property-review-form/property-review-form';
import PropertyReviews from '../../components/property-reviews/property-reviews';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';
import { getRatingStarsStyle } from '../../utils';
import AdCardList from '../../components/ad-card-list/ad-card-list';
import Map from '../../components/map/map';

type OfferScreenProps = {
    offers: Offer[];
    reviews: Review[];
}

export default function OfferScreen({offers, reviews}: OfferScreenProps): JSX.Element {
  const {id} = useParams();
  const [{isFavorite, isPremium, description, goods, host, images, rating, maxAdults, price, title, type, bedrooms}] = offers.filter((ad) => ad.id.toString() === id);
  const [activeOfferId, setActiveOfferId] = useState(0);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image) => (
                (
                  <div className="property__image-wrapper" key = {image}>
                    <img className="property__image" src={image} alt="studio"/>
                  </div>
                )
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              <div className="property__mark">
                <span>{isPremium ? 'Premium' : ''}</span>
              </div>
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <button className={`property__bookmark-button button ${isFavorite ? 'property__bookmark-button--active' : ''}`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: getRatingStarsStyle(rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${bedrooms} Bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Max ${maxAdults} adults`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good) => (
                    <li className="property__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  <span className="property__user-status">
                    {host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="property__description">
                  {description.split('.').map((sentense) => (
                    <p className="property__text" key={sentense}>
                      {sentense}
                    </p>
                  ))}
                </div>
              </div>
              <section className="property__reviews reviews">
                <PropertyReviews reviews={reviews}/>
                <PropertyReviewForm />
              </section>
            </div>
          </div>
          <Map isMainScreen={false} offers={offers.slice(0,3)} activeOfferId={activeOfferId}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <AdCardList isMainScreen={false} offers={offers.slice(0,3)} setActiveOfferId={setActiveOfferId}/>

            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
