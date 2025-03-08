# Speckles

A place for studios. This space is for graphic studios and freelance creators to share their talents, explore inspiring digital assets and connect with fellow creators.

![Main image](https://github.com/user-attachments/assets/e9c1b39c-7cf5-48ea-9454-42abbbddc1ee)

## List of technologies

- Next.js
- React.js
- Typescript
- Tailwind
- ASP\.NET
- REST API

## Key features

- Creating and selling assets
- Having a place as a studio
- Generating PDF invoices
- User preferences
- Currency conversion 
- Studio analytics
- 40+ API endpoints

## Database design

![Database design](https://github.com/user-attachments/assets/d89adda6-3252-4a74-9a38-452df1e62500)

## API endpoints

| Path                                | Method | Summary                                                |
| ----------------------------------- | ------ | ------------------------------------------------------ |
| `/api/v1/assets`                    | GET    | Retrieves all assets in short form.                    |
| `/api/v1/assets`                    | POST   | Creates asset.                                         |
| `/api/v1/assets/{assetId}`          | GET    | Retrieves asset in default form.                       |
| `/api/v1/assets/{assetId}`          | PUT    | Updates asset.                                         |
| `/api/v1/assets/{assetId}`          | DELETE | Deletes asset.                                         |
| `/api/v1/auth/register`             | POST   | Creates user.                                          |
| `/api/v1/auth/login`                | POST   | Validates user.                                        |
| `/api/v1/basket`                    | GET    | Retrieves all basket assets in short form by user id.  |
| `/api/v1/basket`                    | POST   | Creates basket asset for user id.                      |
| `/api/v1/comments`                  | POST   | Creates comment.                                       |
| `/api/v1/comments/{commentId}`      | PUT    | Updates comment.                                       |
| `/api/v1/comments/{commentId}`      | DELETE | Deletes comment.                                       |
| `/api/v1/comments/{commentId}/like` | POST   | Creates comment's like.                                |
| `/api/v1/currencies`                | GET    | Retrieves all currencies.                              |
| `/api/v1/follows`                   | POST   | Creates user follow for user id.                       |
| `/api/v1/licenses`                  | GET    | Retrieves all licenses.                                |
| `/api/v1/orders`                    | GET    | Retrieves all orders in short form by user id.         |
| `/api/v1/orders`                    | POST   | Creates order.                                         |
| `/api/v1/orders/{orderId}`          | GET    | Retrieves order in default form.                       |
| `/api/v1/projects`                  | POST   | Creates project.                                       |
| `/api/v1/projects/{projectId}`      | PUT    | Updates project.                                       |
| `/api/v1/projects/{projectId}`      | DELETE | Deletes project.                                       |
| `/api/v1/promotion`                 | GET    | Retrieves promotion in default form.                   |
| `/api/v1/saved`                     | GET    | Retrieves all saved assets in short form by user id.   |
| `/api/v1/saved`                     | POST   | Creates saved asset for user id.                       |
| `/api/v1/search-prompts`            | GET    | Retrieves all assets in short form.                    |
| `/api/v1/search`                    | GET    | Retrieves all assets in short form.                    |
| `/api/v1/studios`                   | GET    | Retrieves all studios or user's studios in short form. |
| `/api/v1/studios`                   | POST   | Creates studio.                                        |
| `/api/v1/studios/{slug}`            | GET    | Retrieves studio in default form.                      |
| `/api/v1/studios/{slug}`            | PUT    | Updates studio.                                        |
| `/api/v1/studios/{slug}`            | DELETE | Deletes studio.                                        |
| `/api/v1/studios/{slug}/earnings`   | GET    | Retrieves studio's earnings.                           |
| `/api/v1/studios/{slug}/sales`      | GET    | Retrieves studio's sales.                              |
| `/api/v1/studios/{slug}/members`    | POST   | Creates studio member.                                 |
| `/api/v1/studios/{slug}/members`    | DELETE | Deletes studio member.                                 |
| `/api/v1/tags/{tagId}`              | GET    | Retrieves all assets in short form by tag id.          |
| `/api/v1/users/{username}`          | GET    | Retrieves user in short form.                          |
| `/api/v1/users/{username}`          | PUT    | Updates user.                                          |
| `/api/v1/users/{username}`          | DELETE | Deletes user.                                          |

## Studios

Studio is a space for graphic designers to collaborate on their assets, projects, analytics, members and studio settings.

### Analytics

Analytics is a tool specifically designed for studio members to see how well their studio's earnings are going so far. It concludes of two charts. The first is an earnings doughnut chart where you can select a time interval for your earnings data, it also show how many and which assets have been purchased. The second chart is a sales trend chart which tells you how many assets in total have been purchased on a specific time interval.

![Analytics](https://github.com/user-attachments/assets/0168dfe9-d16d-4a66-a6c3-ab45609cbf6a)

### Assets

Assets are an essential part of your studio, they show what quality products you are selling as a studio. Assets are on your studio's page sorted by tags, and users can filter through them with tag selection on the left.

Studio can specify these attributes on an asset: asset's title, description, thumbnail image, other showcasing images, price specified in a selected currency, tags, and under which will licensing the asset should be. Asset's currency is actively being translated to other currencies, user can therefore come and select their preferred one. Users can also comment on an asset and respond to others' with likes. Among other user-asset interactions are adding a preferred asset to their basket or saving it to their favourites list.

![Assets](https://github.com/user-attachments/assets/9e4849f3-d73a-4988-a879-795fb529bc73)
![Asset](https://github.com/user-attachments/assets/b4b5c9a0-02d2-4869-b29e-8bf7424ff825)

### Projects

Projects showcase your capabilities as a studio, you should a handful of selections to convince your potential future client of your abilities. All projects have a title, description, thumbnail image as well as other images, and a client/personal type.

![Projects](https://github.com/user-attachments/assets/d84cfcc6-631a-4cc5-86b2-ab8c5ec5f024)

### Members

Members are another tab in your studio's page for users seeing of what members your studio consists of. You can here also manage your members.

![Members](https://github.com/user-attachments/assets/d8ed85cd-1c9e-47e1-b052-fa2f6f01d0b3)

### Settings

Here you can manage your studio's logo, name, studio slug, about, payment and contact email.

## Payments

Payments are using PayPal API for distributing the total amount purchased to studios and a fair share to Speckles. User can purchase multiple asset at the same time. The total amount purchased first goes to Speckles' PayPal account, then from each asset 95% of the price will be sent to the providing studio, and 5% is fair share kept by Speckles.

![Payments](https://github.com/user-attachments/assets/c2834e64-140c-4f08-88ab-c784c9040ca9)

## Invoices

PDF invoices and automatically generated for each asset separately, every invoice includes the asset purchased, date issued, user’s address as well as studio’s address, price distributed among the user and studio, information about studio, and an invoice ID.

![](https://github.com/user-attachments/assets/88c7d4d9-f644-45da-91ef-a87c017952e0)

## User preferences

User preferences are an important role to users and especially to those who are not registered. User preferences are saved to local storage, and among those items are basket assets, saved assets, currency, if a promotion has been seen, and if a currency was already set. This is to be also to use the site even when the user is not registered. When the user eventually signs up these are will be attached to their account.

## Profile

You can visit your or profiles of other people, just by clicking on their avatar. Your profile is located in the dropdown in the top right of your screen by pressing your avatar. Here you can see your email, country, studios you are in, and which studios you are following. You can edit your profile by clicking on the button in top right, here you can edit your avatar, full name, username, and email.

![Profile](https://github.com/user-attachments/assets/5e196336-183e-4e6f-8ee6-4f5652e58f12)
