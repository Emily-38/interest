import React from 'react'

const confidentialiter = () => {
  return (
    <div className='p-2'>
    <h1 className='text-3xl text-center font-semibold m-4'>
    Politique de confidentialité
    </h1>
    <ol>
        <li >
            <p className='text-xl font-semibold '> 1.Introduction:</p>
            <p>Bienvenue sur notre réseau social. La protection de vos données personnelles est une priorité pour nous. Cette politique de confidentialité a pour objectif de vous informer sur la manière dont nous collectons, utilisons, et protégeons vos données personnelles lorsque vous utilisez notre plateforme.
            En utilisant notre réseau social, vous acceptez les pratiques décrites dans cette politique de confidentialité.</p>
        </li>
        <li>
            <p className='text-xl font-semibold '> 2. Données collectées</p>
            <p>Nous collectons les données suivantes lorsque vous utilisez notre réseau social : </p>
            <ul className='list-disc list-inside pl-5'>
                <li>Email : Utilisé pour la création de votre compte, la communication et la récupération de votre mot de passe.</li>
                <li>Pseudo : Identifiant public visible par les autres utilisateurs.</li>
                <li>Mot de passe : Stocké sous forme hachée pour garantir sa sécurité.</li>
                <li> {`Âge et genre : Ces informations sont facultatives et utilisées pour personnaliser l'expérience utilisateur.`}</li>
                <li>{`Image : Photo de profil choisie par l'utilisateur.`}</li>
                <li>Messages privés : Messages échangés entre utilisateurs via la plateforme.</li>
                <li>Commentaires : Interactions publiques dans les différentes sections du site.</li>
                <p>{`Nous ne collectons pas de cookies ou d'autres technologies de suivi.`}</p>
            </ul>
        </li>
        <li>
            <p className='text-xl font-semibold '> 3. Utilisation des données:</p>
            <p> Les données personnelles collectées sont utilisées exclusivement pour assurer le bon fonctionnement de la plateforme. Aucune donnée n’est partagée à des fins publicitaires ou avec des tiers extérieurs. Les finalités spécifiques sont :</p>
            <ul className='list-disc list-inside pl-5'>
                <li>La gestion des comptes utilisateurs et des publications.</li>
                <li>{`La communication en cas de perte de mot de passe via l'adresse email fournie.`}</li>
                <li> {`L’amélioration des interactions et de l'expérience utilisateur.`} </li>
            </ul>
        </li>
        <li>
            <p className='text-xl font-semibold '> 4. Conservation des données:</p>
            <p>Vos données personnelles sont conservées aussi longtemps que vous avez un compte actif sur notre plateforme. Si vous décidez de supprimer votre compte, toutes vos informations personnelles (email, pseudo, âge, genre, etc.) seront définitivement supprimées de notre base de données. Toutefois, les publications et commentaires que vous avez réalisés resteront accessibles, mais ne seront plus associés à votre compte.</p>
        </li>
        <li>
            <p className='text-xl font-semibold '>5. Sécurité des données: </p>
            <p>Nous avons mis en place des mesures techniques et organisationnelles pour protéger vos données contre tout accès non autorisé. Parmi ces mesures :</p>
            <ul className='list-disc list-inside pl-5'>
                <li>Les pages sensibles sont protégées par une redirection vers la page de connexion pour les utilisateurs non authentifiés.</li>
                <li>Les publications peuvent uniquement être modifiées par leur auteur ou par un administrateur.</li>
                <li>Les mots de passe sont stockés sous forme hachée, garantissant qu’ils ne peuvent être récupérés en clair.</li>
                <li>En cas de perte de mot de passe, un processus sécurisé utilisant votre adresse email permet la récupération du compte.</li>       
            </ul>
        </li>
        <li>
            <p className='text-xl font-semibold '>6. Vos droits: </p>
            <p>{`En tant qu'utilisateur de notre réseau social, vous disposez des droits suivants concernant vos données personnelles :`}</p>
            <ul className='list-disc list-inside pl-5'>
                <li>Accès : Vous pouvez accéder à toutes les informations vous concernant via les paramètres de votre compte.</li>
                <li>Modification : Vous avez la possibilité de modifier à tout moment vos informations personnelles via votre espace utilisateur.</li>            
                <li>Suppression : Vous pouvez choisir de supprimer votre compte et toutes vos données personnelles seront effacées de notre base de données.</li>
                <li>{`Limitation : Vous avez le droit de limiter certaines utilisations de vos données si vous estimez qu'elles ne sont plus nécessaires aux finalités pour lesquelles elles ont été collectées.`}</li>
            </ul>
        </li>
        <li>
            <p className='text-xl font-semibold '>7. Accès et utilisation par des mineurs: </p>
            <p>{`Notre réseau social est destiné uniquement aux utilisateurs âgés de 18 ans et plus. Si nous apprenons qu'une personne de moins de 18 ans a créé un compte sans autorisation, nous prendrons les mesures nécessaires pour supprimer immédiatement les informations de cette personne.`}</p>
        </li>
        <li>
            <p className='text-xl font-semibold '>8. Transferts internationaux:</p>
            <p>{`Bien que notre réseau social soit basé en France, vos données peuvent être accessibles dans d'autres régions. Nous nous engageons à respecter toutes les lois applicables en matière de protection des données, notamment le Règlement Général sur la Protection des Données (RGPD) pour les utilisateurs résidant en Union européenne.`}</p>
        </li>
        <li>
            <p className='text-xl font-semibold '>9. Modifications de cette politique</p>
            <p>Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment pour refléter des changements dans nos pratiques ou pour nous conformer à de nouvelles exigences légales. Vous serez informé de toute modification substantielle via notre plateforme.</p>
        </li>
        <li>
            <p className='text-xl font-semibold '>10. Nous contacter</p>
            <p>{`Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité, ou si vous souhaitez exercer vos droits sur vos données, veuillez nous contacter à l'adresse suivante : martorana.emily38@gmail.com.`}</p>
        </li>

    </ol>
</div>
  )
}

export default confidentialiter